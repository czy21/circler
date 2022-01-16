import pathlib
import pkgutil


def scan(path, prefix):
    ret = []
    for t in pkgutil.iter_modules(path=path, prefix=prefix + "."):
        if t.ispkg:
            ret += scan([pathlib.Path(t.module_finder.path).joinpath(t.name.replace(prefix + ".", "")).as_posix()], t.name)
        else:
            ret.append(t)
    return ret
