import multiprocessing
import sys
import argparse

def worker():
    print(f"Hello from a side process! (PID: {multiprocessing.current_process().pid})")

if __name__ == "__main__":
    multiprocessing.freeze_support()
    available_methods = multiprocessing.get_all_start_methods()
    parser = argparse.ArgumentParser(description="Multiprocessing Method Tester")
    parser.add_argument(
        "--method", 
        help="Select the multiprocessing start method (fork, forkserver, spawn)"
    )
    args = parser.parse_args()
    print(f"Python version: {sys.version}")
    print(f"Available methods: {available_methods}")
    print(f"Selected method: {multiprocessing.get_start_method()}")
    print("-" * 30)
    if args.method not in available_methods:
        print(f'This OS does not support {args.method}. Exiting quietly.')
        sys.exit(0)
    if args.method:
        multiprocessing.set_start_method(args.method, force=True)
    p = multiprocessing.Process(target=worker)
    p.start()
    p.join()
