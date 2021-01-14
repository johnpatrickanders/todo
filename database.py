from app_container.models import (
    User,
    TaskList,
    Task,
)
from app_container import app, db
from dotenv import load_dotenv

load_dotenv()


with app.app_context():
    # db.drop_all()
    # db.create_all()

    seeder = [
        User(
            email="demo@example.com",
            firstname="demo",
            lastname="user",
            password="password",
        ),
        # User(
        #     email="second@example.com",
        #     firstname="second",
        #     lastname="person",
        #     password="password",
        # ),
        # User(
        #     email="test@test.com",
        #     firstname="TestFirstName",
        #     lastname="TestLastName",
        #     password="password",
        # ),
        # TaskList(userId=1, title="Home"),
        # TaskList(userId=1, title="Work"),
        # TaskList(userId=1, title="Invest?"),
        # TaskList(userId=2, title="School"),
        # Task(taskListId=1, title="Do Somthing Cool"),
        # Task(taskListId=1, title="Do Somthing Cool But Safe"),
        # Task(taskListId=1, title="Do Somthing Else Cool"),
        # Task(taskListId=1, title="Do Nothing"),
        # Task(taskListId=1, title="Hello, Do Something"),
        # Task(taskListId=1, title="I'm Gonna Do This"),
        # Task(taskListId=1, title="Don't Do This"),
        # Task(taskListId=1, title="Do This"),
        # Task(taskListId=2, title="bnb"),
        # Task(taskListId=2, title="bsv"),
        # Task(taskListId=2, title="usdt"),
        # Task(taskListId=2, title="ltc"),
        # Task(taskListId=2, title="eth"),
        # Task(taskListId=1, title="trx"),
        # Task(taskListId=2, title="xmr"),
        # Task(taskListId=2, title="ada"),
        # Task(taskListId=2, title="xtz"),
        # Task(taskListId=1, title="wbtc"),
        # Task(taskListId=3, title="xtz"),
        # Task(taskListId=3, title="trx"),
        # Task(taskListId=4, title="wbtc"),
        # Task(taskListId=4, title="ltc"),
        # Task(taskListId=5, title="dot"),
        # Task(taskListId=3, title="btc"),
        # Task(taskListId=3, title="ada"),
        # Task(taskListId=3, title="eth"),
        # Task(taskListId=3, title="fil"),
        # Task(taskListId=3, title="vet"),
        # Task(taskListId=3, title="dai"),
    ]

    for seed in seeder:
        db.session.add(seed)
    db.session.commit()
