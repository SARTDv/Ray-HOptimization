import ray
import time
import socket

@ray.remote
def worker_task():
    time.sleep(1)
    return f"Executed on {socket.gethostname()}"

# Inicializar Ray
ray.init(address='auto')

# Ejecutar tareas en paralelo
start = time.time()
results = ray.get([worker_task.remote() for _ in range(10)])
end = time.time()

print(f"Tiempo total: {end-start:.2f} segundos")
print("Resultados por nodo:")
for result in results:
    print(result)

print("\nResumen de ejecución:")
from collections import Counter
print(Counter(results))