# fizzbuzz function
def fizzbuzz(n):
    """
    A fancy implementation of FizzBuzz that uses list comprehension
    and a dictionary for extensibility.
    """
    rules = {
        3: "Fizz",
        5: "Buzz"
    }
    
    return [
        ''.join(word for num, word in rules.items() if i % num == 0) 
        or str(i) for i in range(1, n + 1)
    ]

def print_fizzbuzz(n):
    """Prints FizzBuzz sequence up to n"""
    for result in fizzbuzz(n):
        print(result)
