using Flux3D
using CuArrays

CuArrays.allowscalar(false)

@testset "PointCoud transforms" begin

    for inplace in [true, false]
        @testset "ScalePointCloud inplace=$(inplace)" begin
            p = rand(Float32, 32, 3) |> gpu
            t1 = ScalePointCloud(2.0; inplace = inplace) |> gpu
            t2 = ScalePointCloud(0.5; inplace = inplace) |> gpu
            pc1 = PointCloud(p) |> gpu
            pc2 = t2(t1(pc1))
            @test pc1.points isa CuArray
            @test pc2.points isa CuArray
            @test all(isapprox.(Array(p), Array(pc2.points), rtol = 1e-5, atol = 1e-5))
        end
    end

    for inplace in [true, false]
        @testset "RotatePointCloud inplace=$(inplace)" begin
            p = rand(Float32, 32, 3)
            rotmat = 2 .* one(rand(Float32, 3, 3))
            rotmat_inv = inv(rotmat)

            t1 = RotatePointCloud(rotmat; inplace = inplace) |> gpu
            t2 = RotatePointCloud(rotmat_inv; inplace = inplace) |> gpu
            pc1 = PointCloud(p) |> gpu
            pc2 = t2(t1(pc1)) |> gpu
            @test t1.rotmat isa CuArray
            @test t2.rotmat isa CuArray
            @test pc1.points isa CuArray
            @test pc2.points isa CuArray
            @test all(isapprox.(Array(p), Array(pc2.points), rtol = 1e-5, atol = 1e-5))
        end
    end

    for inplace in [true, false]
        @testset "ReAlignPointCloud inplace=$(inplace)" begin
            p1 = rand(Float32, 32, 3)
            p2 = rand(Float32, 32, 3)
            tgt = PointCloud(p2)
            src = PointCloud(p1) |> gpu
            t = ReAlignPointCloud(tgt; inplace = inplace) |> gpu
            src_1 = t(src) |> gpu
            @test t.t_min isa CuArray
            @test t.t_max isa CuArray
            @test src.points isa CuArray
            @test src_1.points isa CuArray

            # Transformed PointCloud should be inside the bounding box defined by `tgt` PointCloud
            @test all(
                reshape(maximum(
                    Array(tgt.points), dims = 1), (1, :)) .>= 
                    Array(src_1.points) .>= 
                    reshape(minimum(Array(tgt.points), dims = 1), (1, :)))
        end
    end

    for inplace in [true, false]
        @testset "NormalizePointCloud inplace=$(inplace)" begin
            p = rand(Float32, 32, 3)
            t = NormalizePointCloud(; inplace = inplace)
            pc1 = PointCloud(p) |> gpu
            pc2 = t(pc1) |> gpu
            @test pc1.points isa CuArray
            @test pc2.points isa CuArray
            @test all(isapprox.(mean(Array(pc2.points);dims = 1), zeros(Float32, 1, size(p, 2)), rtol = 1e-5, atol = 1e-5))
            @test all(isapprox.(std(Array(pc2.points);dims = 1), ones(Float32, 1, size(p, 2)), rtol = 1e-5, atol = 1e-5))
        end
    end

end # PointCloud transforms