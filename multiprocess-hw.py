import multiprocessing
import sys
import argparse

def worker():
    print(f"Hello from a side process! (PID: {multiprocessing.current_process().pid})")

if __name__ == "__main__":
    multiprocessing.freeze_support()
    parser = argparse.ArgumentParser(description="Multiprocessing Method")
    parser.add_argument(
        "--method", 
        choices=["spawn", "fork", "forkserver"], 
        help="Select the multiprocessing start method"
    )
    args = parser.parse_args()
    if args.method:
        multiprocessing.set_start_method(args.method)
    print(f"Python Version: {sys.version}")
    print(f"Multiprocessing Method: {multiprocessing.get_start_method()}")
    print("-" * 30)
    p = multiprocessing.Process(target=worker)
    p.start()
    p.join()
    print(f'Hello again from main process! (PID: {multiprocessing.current_process().pid})')
    
