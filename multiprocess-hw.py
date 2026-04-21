import multiprocessing
import sys
import argparse

def worker():
    print(f"Hello from a side process! (PID: {multiprocessing.current_process().pid})")

if __name__ == "__main__":
    # 1. Setup Argument Parser
    parser = argparse.ArgumentParser(description="Multiprocessing Method Tester")
    parser.add_argument(
        "--method", 
        choices=["spawn", "fork", "forkserver"], 
        help="Select the multiprocessing start method"
    )
    args = parser.parse_args()

    # 2. Set the method if requested, otherwise keep OS default
    if args.method:
        try:
            multiprocessing.set_start_method(args.method)
        except RuntimeError as e:
            print(f"Error setting method: {e}")

    # 3. Display environment info
    print(f"Python Version: {sys.version}")
    print(f"Multiprocessing Method: {multiprocessing.get_start_method()}")
    print("-" * 30)

    # 4. Run the process
    p = multiprocessing.Process(target=worker)
    p.start()
    p.join()
