var documenterSearchIndex = {"docs":
[{"location":"#","page":"Home","title":"Home","text":"CurrentModule = Flux3D","category":"page"},{"location":"#Flux3D-1","page":"Home","title":"Flux3D","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Modules = [Flux3D]","category":"page"},{"location":"#Flux3D.Compose","page":"Home","title":"Flux3D.Compose","text":"Compose(transforms...)\n\nComposes multiple transforms/functions sequentially. Compose also support indexing and slicing.\n\nExamples:\n\njulia> t = Compose(x->2*x, x->x/2)\njulia> t(2) == 2\n\njulia> t = Compose(ScalePointCloud(2.0), NormalizePointCloud())\njulia> p = PointCloud(rand(1024,3))\njulia> t(p) == t[2](t[1](p))\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.NormalizePointCloud","page":"Home","title":"Flux3D.NormalizePointCloud","text":"NormalizePointCloud(; inplace::Bool=true)\n\nNormalize PointCloud with mean at origin and unit standard deviation.\n\ninplace is optional keyword argument, to make transformation in-place If inplace is set to false, it will create deepcopy of PointCloud.\n\nSee also: normalize, normalize!\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.PointCloud","page":"Home","title":"Flux3D.PointCloud","text":"PointCloud\n\nInitialize PointCloud representation.\n\npoints should be Array of size (D, N, B) where N is the number of points, D is dimensionality of each points (i.e. D=2 or D=3) and B is the batch size of PointCloud. normals is optional field, if given should be Array of size (D, N, B) where N and B should match with the N and B of points and D=2 or D=3 (i.e. normals for 2D and 3D PointCloud respectively).\n\nFields:\n\npoints      - Points that makes up whole PointCloud.\nnormals     - Normals of each points in PointCloud.\n\nAvailable Contructor:\n\nPointCloud(points, normals=nothing)\nPointCloud(;points, normals=nothing)\nPointCloud(pcloud::PointCloud)\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.ReAlignPointCloud","page":"Home","title":"Flux3D.ReAlignPointCloud","text":"ReAlignPointCloud(target::PointCloud; inplace::Bool=true)\nReAlignPointCloud(target::AbstractArray{<:Number, 2}; inplace::Bool=true)\n\nRe-Align PointCloud to axis aligned bounding box of target PointCloud.\n\ninput PointCloud and target PointCloud should be of same size. inplace is optional keyword argument, to make transformation in-place If inplace is set to false, it will create deepcopy of PointCloud.\n\nSee also: realign, realign!\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.RotatePointCloud","page":"Home","title":"Flux3D.RotatePointCloud","text":"RotatePointCloud(rotmat::AbstractArray{<:Number,2}; inplace::Bool=true)\n\nRotate PointCloud with a given rotation matrix rotmat.\n\nrotmat must be AbstractArray{<:Number,2} of size (3,3). inplace is optional keyword argument, to make transformation in-place If inplace is set to false, it will create deepcopy of PointCloud. Given rotmat, this transform will rotate each point coordinates (ie. x,y,z) in PointCloud.\n\nSee also: rotate, rotate!\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.ScalePointCloud","page":"Home","title":"Flux3D.ScalePointCloud","text":"ScalePointCloud(factor::Number; inplace::Bool=true)\n\nScale PointCloud with a given scaling factor factor.\n\nfactor should be strictly greater than 0.0 for obvious reason. inplace is optional keyword argument, to make transformation in-place. If inplace is set to false, it will create deepcopy of PointCloud. Given factor, this transform scale each point in PointCloud, ie. point = point * factor\n\nSee also: scale, scale!\n\n\n\n\n\n","category":"type"},{"location":"#Flux3D.npoints-Tuple{PointCloud}","page":"Home","title":"Flux3D.npoints","text":"npoints(p::PointCloud)\n\nReturns the size of PointCloud.\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.visualize","page":"Home","title":"Flux3D.visualize","text":"visualize(pcloud::PointCloud; kwargs...)\n\nVisualize PointCloud pcloud at index.\n\nDimension of points in PointCloud pcloud must be 3.\n\nOptional Arguments:\n\ncolor (Symbol)        - Color of the marker, default :blue\nmarkersize (Number)   - Size of the marker, default 0.02*npoints(pcloud)/1024  \n\n\n\n\n\n","category":"function"},{"location":"#Flux3D.normalize!-Tuple{PointCloud}","page":"Home","title":"Flux3D.normalize!","text":"normalize!(pcloud::PointCloud)\n\nNormalize the PointCloud pcloud with mean centered at origin and unit standard deviation and overwrite the pcloud with normalized PointCloud.\n\nSee also: normalize\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> normalize!(p)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.normalize-Tuple{PointCloud}","page":"Home","title":"Flux3D.normalize","text":"normalize(pcloud::PointCloud)\n\nNormalize the PointCloud pcloud with mean centered at origin and unit standard deviation\n\nSee also: normalize!\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> p = normalize(p)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.realign!-Tuple{PointCloud,AbstractArray{Float32,2},AbstractArray{Float32,2}}","page":"Home","title":"Flux3D.realign!","text":"realign!(src::PointCloud, tgt::PointCloud)\nrealign!(src::PointCloud, tgt_min::AbstractArray{<:Number,2}, tgt_max::AbstractArray{<:Number,2})\n\nRe-Align the PointCloud src with the axis aligned bounding box of PointCloud tgt and overwrite pcloud with re-aligned PointCloud.\n\nPointCloud src and tgt should be of same dimension.\n\nSee also: realign\n\nExamples:\n\njulia> src = PointCloud(rand(1024,3))\njulia> tgt = PointCloud(rand(1024,3))\njulia> realign!(src, tgt)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.realign-Tuple{PointCloud,AbstractArray{#s27,2} where #s27<:Number,AbstractArray{#s30,2} where #s30<:Number}","page":"Home","title":"Flux3D.realign","text":"realign(src::PointCloud, tgt::PointCloud)\nrealign(src::PointCloud, tgt_min::AbstractArray{<:Number,2}, tgt_max::AbstractArray{<:Number,2})\n\nRe-Align the PointCloud src with the axis aligned bounding box of PointCloud tgt.\n\nPointCloud src and tgt should be of same dimension.\n\nSee also: realign!\n\nExamples:\n\njulia> src = PointCloud(rand(1024,3))\njulia> tgt = PointCloud(rand(1024,3))\njulia> src = realign!(src, tgt)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.rotate!-Tuple{PointCloud,AbstractArray{Float32,2}}","page":"Home","title":"Flux3D.rotate!","text":"rotate!(pcloud::PointCloud, rotmat::AbstractArray{Number,2})\n\nRotate the PointCloud pcloud by rotation matrix rotmat and overwrite pcloud with rotated PointCloud.\n\nRotation matrix rotmat should be of size (3,3)\n\nSee also: rotate\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> rotmat = rand(3,3)\njulia> rotate!(p, rotmat)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.rotate-Tuple{PointCloud,AbstractArray{Float32,2}}","page":"Home","title":"Flux3D.rotate","text":"rotate(pcloud::PointCloud, rotmat::Array{Number,2})\n\nRotate the PointCloud pcloud by rotation matrix rotmat.\n\nRotation matrix rotmat should be of size (3,3)\n\nSee also: rotate!\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> rotmat = rand(3,3)\njulia> p = rotate(p, rotmat)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.scale!-Tuple{PointCloud,Float32}","page":"Home","title":"Flux3D.scale!","text":"scale!(pcloud::PointCloud, factor::Number)\n\nScale the PointCloud pcloud by scaling factor factor and overwrite pcloud with scaled PointCloud.\n\nScaling factor factor should be strictly greater than 0.0.\n\nSee also: scale\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> scale!(p, 1.0)\n\n\n\n\n\n","category":"method"},{"location":"#Flux3D.scale-Tuple{PointCloud,Float32}","page":"Home","title":"Flux3D.scale","text":"scale(pcloud::PointCloud, factor::Number)\n\nScale the PointCloud pcloud by scaling factor factor.\n\nScaling factor factor should be strictly greater than 0.0.\n\nSee also: scale!\n\nExamples:\n\njulia> p = PointCloud(rand(1024,3))\njulia> p = scale(1.0)\n\n\n\n\n\n","category":"method"}]
}
