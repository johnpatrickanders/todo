from app_container.models import (
    User,
    List,
    Task,
)
from app_container import app, db
from dotenv import load_dotenv

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    seeder = [
        User(
            firstname="demo",
            lastname="user",
            email="demo@example.com",
            password="password",
        ),
        User(
            firstname="second",
            lastname="person",
            email="second@example.com",
            password="password",
        ),
        User(
            firstname="TestFirstName",
            lastname="TestLastName",
            password="password",
            email="test@test.com",
        ),
        List(userId=1, title="Home"),
        List(userId=1, title="Work"),
        List(userId=1, title="Invest?"),
        List(userId=2, title="School"),
        List(userId=3, title="Pet"),
        Task(listId=1, title="Do Somthing Cool"),
        Task(listId=1, title="Do Somthing Cool But Safe"),
        Task(listId=1, title="Do Somthing Else Cool"),
        Task(listId=1, title="Do Nothing"),
        Task(listId=1, title="Hello, Do Something"),
        Task(listId=1, title="I'm Gonna Do This"),
        Task(listId=1, title="Don't Do This"),
        Task(listId=1, title="Do This"),
        Task(listId=2, title="bnb"),
        Task(listId=2, title="bsv"),
        Task(listId=2, title="usdt"),
        Task(listId=2, title="ltc"),
        Task(listId=2, title="eth"),
        Task(listId=1, title="trx"),
        Task(listId=2, title="xmr"),
        Task(listId=2, title="ada"),
        Task(listId=2, title="xtz"),
        Task(listId=1, title="wbtc"),
        Task(listId=3, title="xtz"),
        Task(listId=3, title="trx"),
        Task(listId=4, title="wbtc"),
        Task(listId=4, title="ltc"),
        Task(listId=5, title="dot"),
        Task(listId=3, title="btc"),
        Task(listId=3, title="ada"),
        Task(listId=3, title="eth"),
        Task(listId=3, title="fil"),
        Task(listId=3, title="vet"),
        Task(listId=3, title="dai"),
    ]

    for seed in seeder:
        db.session.add(seed)
    db.session.commit()
