import multiprocessing

def say_hello():
    print("Hello from a side process!")

if __name__ == "__main__":
    p = multiprocessing.Process(target=say_hello)
    p.start()
    p.join()
    print("Main process finished.")
