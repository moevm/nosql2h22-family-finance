from settings import tests

tests.insert_one({"test": "Hello World"})
print(tests.find_one({"test": "Hello World"}).get('test'))