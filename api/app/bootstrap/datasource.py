import sqlalchemy
import sqlalchemy.orm

from app.bootstrap.context import ApplicationContext


def init(context: ApplicationContext):
    def config_session(properties: dict) -> sqlalchemy.orm.Session():
        return sqlalchemy.orm.scoped_session(sqlalchemy.orm.sessionmaker(sqlalchemy.create_engine(**properties), autocommit=True, autoflush=True))

    datasource = {}
    for k, v in context.properties["datasource"].items():
        datasource[k] = config_session(v)
        context.logger.info("ds => {0}".format(k))
    context.datasource = datasource
