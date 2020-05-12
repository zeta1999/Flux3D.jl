export Compose, ScalePointCloud, RotatePointCloud, ReAlignPointCloud, NormalizePointCloud

"""
    Compose(transforms...)

Composes multiple transforms/functions sequentially.
`Compose` also support indexing and slicing.

### Examples:

```julia
julia> t = Compose(x->2*x, x->x/2)
julia> t(2) == 2

julia> t = Compose(ScalePointCloud(2.0), NormalizePointCloud())
julia> p = PointCloud(rand(1024,3))
julia> t(p) == t[2](t[1](p))
```
"""
struct Compose{T <: Tuple} <: AbstractCompose
    transforms::T
end

Compose(xs...) = Compose(xs)
applytransforms(::Tuple{}, x) = x
applytransforms(fs::Tuple, x) = applytransforms(tail(fs), first(fs)(x))

functor(::Type{<:Compose}, c) = c.transforms, ls -> Chain(ls...)

(c::Compose)(x) = applytransforms(c.transforms, x)

Base.getindex(c::Compose, i::AbstractArray) = Compose(c.transforms[i]...)
Base.getindex(c::Compose, i::Int) = c[i:i]

function Base.show(io::IO, c::Compose)
    print(io, "Compose(")
    join(io, c.transforms, ", ")
    print(io, ")")
end

"""
    ScalePointCloud(factor::Number; inplace::Bool=true)

Scale PointCloud with a given scaling factor `factor`.

`factor` should be strictly greater than `0.0` for obvious reason.
`inplace` is optional keyword argument, to make transformation in-place.
If `inplace` is set to `false`, it will create deepcopy of PointCloud.
Given `factor`, this transform scale each point in PointCloud, ie. `point = point * factor`

See also: [`scale`](@ref), [`scale!`](@ref)
"""
struct ScalePointCloud <: AbstractTransform
    factor::Float32
    inplace::Bool
end

function ScalePointCloud(factor::Number; inplace::Bool = true)
    factor > 0.0 || error("factor must be greater than 0.0")
    ScalePointCloud(Float32(factor), inplace)
end

@functor ScalePointCloud

function (t::ScalePointCloud)(pcloud::PointCloud)
    t.inplace || (pcloud = deepcopy(pcloud);)
    scale!(pcloud, t.factor)
    return pcloud
end

Base.show(io::IO, t::ScalePointCloud) = print(io, "$(typeof(t))(factor=$(t.factor); inplace=$(t.inplace))")

"""
    RotatePointCloud(rotmat::AbstractArray{<:Number,2}; inplace::Bool=true)

Rotate PointCloud with a given rotation matrix `rotmat`.

`rotmat` must be `AbstractArray{<:Number,2}` of size `(3,3)`.
`inplace` is optional keyword argument, to make transformation in-place
If `inplace` is set to `false`, it will create deepcopy of PointCloud.
Given `rotmat`, this transform will rotate each point coordinates (ie. x,y,z) in PointCloud.

See also: [`rotate`](@ref), [`rotate!`](@ref)
"""
struct RotatePointCloud <: AbstractTransform
    rotmat::AbstractArray{Float32,2}
    inplace::Bool
end

function RotatePointCloud(rotmat::AbstractArray{<:Number,2}; inplace::Bool = true)
    size(rotmat) == (3, 3) || error("rotmat must be (3,3) array, but instead got $(size(rotmat)) array")
    return RotatePointCloud(Float32.(rotmat), inplace)
end

@functor RotatePointCloud

function (t::RotatePointCloud)(pcloud::PointCloud)
    t.inplace || (pcloud = deepcopy(pcloud);)
    rotate!(pcloud, t.rotmat)
    return pcloud
end

Base.show(io::IO, t::RotatePointCloud) = print(io, "$(typeof(t))(rotmat; inplace=$(t.inplace))")

"""
    ReAlignPointCloud(target::PointCloud; inplace::Bool=true)
    ReAlignPointCloud(target::AbstractArray{<:Number, 2}; inplace::Bool=true)

Re-Align PointCloud to axis aligned bounding box of `target` PointCloud.

`input` PointCloud and `target` PointCloud should be of same size.
`inplace` is optional keyword argument, to make transformation in-place
If `inplace` is set to `false`, it will create deepcopy of PointCloud.

See also: [`realign`](@ref), [`realign!`](@ref)
"""
struct ReAlignPointCloud <: AbstractTransform
    t_min::AbstractArray{Float32,2}
    t_max::AbstractArray{Float32,2}
    inplace::Bool
end

function ReAlignPointCloud(target::PointCloud; inplace::Bool = true)
    t_min = reshape(minimum(target.points, dims = 1), (1, :))
    t_max = reshape(maximum(target.points, dims = 1), (1, :))
    ReAlignPointCloud(t_min, t_max, inplace)
end

ReAlignPointCloud(target::AbstractArray{<:Number,2}; inplace::Bool = true) = 
    ReAlignPointCloud(PointCloud(target), inplace=inplace)

@functor ReAlignPointCloud

function (t::ReAlignPointCloud)(pcloud::PointCloud)
    t.inplace || (pcloud = deepcopy(pcloud);)
    realign!(pcloud, t.t_min, t.t_max)
    return pcloud
end

Base.show(io::IO, t::ReAlignPointCloud) = print(io, "$(typeof(t))(target=PointCloud(...); inplace=$(t.inplace))")

"""
    NormalizePointCloud(; inplace::Bool=true)

Normalize PointCloud with mean at origin and unit standard deviation.

`inplace` is optional keyword argument, to make transformation in-place
If `inplace` is set to `false`, it will create deepcopy of PointCloud.

See also: [`normalize`](@ref), [`normalize!`](@ref)
"""
struct NormalizePointCloud <: AbstractTransform
    inplace::Bool
end

NormalizePointCloud(; inplace::Bool = true) = NormalizePointCloud(inplace)

@functor NormalizePointCloud

function (t::NormalizePointCloud)(pcloud::PointCloud)
    t.inplace || (pcloud = deepcopy(pcloud);)
    normalize!(pcloud)
    return pcloud
end

Base.show(io::IO, t::NormalizePointCloud) = print(io, "$(typeof(t))(;inplace=$(t.inplace))")
