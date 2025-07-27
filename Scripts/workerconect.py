import sys
import ray

if len(sys.argv) != 2:
    print("Uso: python workerconect.py <HEAD_NODE_IP>")
    sys.exit(1)

head_ip = sys.argv[1]
address = f"ray://{head_ip}:6379"
ray.init(address=address)
print(ray.nodes())
