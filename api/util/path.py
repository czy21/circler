import io
import json
from pathlib import Path

import humps
from flask import current_app

from model import cluster


def get_cluster():
    clusters = []
    cluster_path = Path(current_app.root_path).joinpath("data")
    if cluster_path.exists():
        for t in cluster_path.iterdir():
            with io.open(t.joinpath("meta.json").as_posix(), "r", encoding="utf-8", newline="\n") as meta_file:
                c = cluster.Cluster(**humps.decamelize(json.load(meta_file)))
                if not Path(c.config_path).is_absolute():
                    c.config_path = t.joinpath(c.config_path)
                clusters.append(c)
    return clusters
