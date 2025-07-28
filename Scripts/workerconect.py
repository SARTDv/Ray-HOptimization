import sys
import ray
import time 

if len(sys.argv) != 2:
    print("Uso: python workerconect.py <HEAD_NODE_IP>")
    sys.exit(1)

head_ip = sys.argv[1]
address = f"ray://{head_ip}:6379"


while true:
    time.sleep(3)
    ray.init(address=address)
    print(ray.nodes())

