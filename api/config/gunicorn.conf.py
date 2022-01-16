import multiprocessing

bind = "0.0.0.0:8080"
workers = 2
threads = multiprocessing.cpu_count() * 2
timeout = 600
worker_class = "gevent"
