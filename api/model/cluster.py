class Cluster:
    def __init__(self, name: str = None, description: str = None, config_path: str = None, content: str = None, **kwargs):
        self.name = name
        self.description = description
        self.config_path = config_path
        self.content = content
