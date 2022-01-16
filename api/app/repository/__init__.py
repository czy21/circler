import os

from sqlalchemy import create_engine


class DataSource:

    @staticmethod
    def get(key: str):
        db_dngine = create_engine(url=os.getenv("datasource_master_url"), pool_size=2, pool_timeout=20)
        cur = db_dngine.execute(
            "select * from ent_sale limit 10"
        )
        result = cur.fetchall()
