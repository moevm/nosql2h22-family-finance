import psycopg2
from config import host, user, password, db_name

try:
    connection = psycopg2.connect(
        host=host,
        user=user,
        password=password,
        database=db_name
    )
    connection.autocommit = True

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT version();"
        )

        print(f"Server version: {cursor.fetchone()}")

    # создание таблицы user
    # with connection.cursor() as cursor:
    #     cursor.execute(
    #         """CREATE TABLE bank_user(
    #             id int PRIMARY KEY,
    #             name varchar(100) NOT NULL,
    #             surname varchar(100) NOT NULL,
    #             login varchar(100) NOT NULL,
    #             user_password varchar(100) NOT NULL,
    #             birth_date date NOT NULL);"""
    #     )
    #
    #     # connection.commit()
    #     print("[INFO] Table created successfully")

    # создание таблицы bank account
    # with connection.cursor() as cursor:
    #     cursor.execute(
    #         """CREATE TABLE bank_account(
    #             id int PRIMARY KEY,
    #             balance decimal(10,2) NOT NULL,
    #             is_family boolean NOT NULL);"""
    #     )
    #
    #     # connection.commit()
    #     print("[INFO] Table created successfully")

    # создание таблицы transaction
    # with connection.cursor() as cursor:
    #     cursor.execute(
    #         """CREATE TABLE transaction(
    #             id int PRIMARY KEY,
    #             type varchar(100) NOT NULL,
    #             sum decimal(10,2) NOT NULL,
    #             created_at timestamp NOT NULL,
    #             category varchar(100) NOT NULL,
    #             name varchar(100) NOT NULL,
    #             created_by int NOT NULL,
    #             created_by_balance_id int NOT NULL,
    #             FOREIGN KEY (created_by) references bank_user(id),
    #             FOREIGN KEY (created_by_balance_id) references bank_account(id));"""
    #     )
    #
    #     # connection.commit()
    #     print("[INFO] Table created successfully")
    #
    # создание таблицы user accounts
    # with connection.cursor() as cursor:
    #     cursor.execute(
    #         """CREATE TABLE user_accounts(
    #             user_id int NOT NULL,
    #             bank_account_id int NOT NULL,
    #             PRIMARY KEY (user_id, bank_account_id),
    #             FOREIGN KEY (user_id) references bank_user(id),
    #             FOREIGN KEY (bank_account_id) references bank_account(id));"""
    #     )
    #
    #     # connection.commit()
    #     print("[INFO] Table created successfully")


    # запрос (регистрация пользователя)
    with connection.cursor() as cursor:
        cursor.execute(
            """INSERT INTO bank_user (id, name, surname, login, user_password, birth_date) VALUES
            (1, 'Oleg', 'Ivanov', 'test_1', 'test_test', '11.11.1999');"""
        )

        print("[INFO] Data was succefully inserted")

    # запрос (получение пользователя)
    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT * FROM bank_user WHERE id = 1;"""
        )

        print(cursor.fetchone())

    # запрос (создание семейного баланса)
    with connection.cursor() as cursor:
        cursor.execute(
            """INSERT INTO bank_account (id, balance, is_family) VALUES
            (1, 0, TRUE);"""
        )

        print("[INFO] Data was succefully inserted")

    # запрос (добавить пользователя в семейный баланс)
    with connection.cursor() as cursor:
        cursor.execute(
            """INSERT INTO user_accounts (user_id, bank_account_id) VALUES
            (1, 1);"""
        )
        print("[INFO] Data was succefully inserted")

    # запрос (получение семейного счета для конкретного пользователя)
    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT * FROM bank_account JOIN user_accounts ON user_accounts.user_id=bank_account.id AND is_family = TRUE AND user_accounts.user_id=1;"""
        )

        print(cursor.fetchone())

    # запрос (создание транзакции)
    with connection.cursor() as cursor:
        cursor.execute(
            """INSERT INTO transaction (id, type, sum, created_at, category, name, created_by, created_by_balance_id) VALUES
            (1, 'Пополнение', 1000, now(), 'Переводы', 'Семейный счет', 1, 1);"""
        )

        print("[INFO] Data was succefully inserted")

    # запрос (получение списка транзакций)
    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT * FROM transaction;"""
        )

        print(cursor.fetchone())


except Exception as _ex:
    print("[INFO] Error while working with PostgreSQL", _ex)
finally:
    if connection:
        # cursor.close()
        connection.close()
        print("[INFO] PostgreSQL connection closed")
