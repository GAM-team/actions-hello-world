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
        choices=available_methods, 
        help="Select the multiprocessing start method"
    )
    args = parser.parse_args()
    if args.method:
        try:
            multiprocessing.set_start_method(args.method)
        except RuntimeError as e:
            print(f"Error setting method: {e}")
    print(f"Python version: {sys.version}")
    print(f"Available methods: {available_methods}")
    print(f"Selected method: {multiprocessing.get_start_method()}")
    print("-" * 30)
    p = multiprocessing.Process(target=worker)
    p.start()
    p.join()
