from app_container.models import (
    User,
    TaskList,
    Task,
)
from app_container import app, db
from dotenv import load_dotenv

load_dotenv()


with app.app_context():
    db.drop_all()
    # db.create_all()

    seeder = [
        User(
            email="demo@example.com",
            password="password",
        ),
        User(
            email="second@example.com",
            password="password",
        ),
        User(
            email="test@test.com",
            password="password",
        ),
        TaskList(user_id=1, title="Home"),
        TaskList(user_id=1, title="Work"),
        TaskList(user_id=1, title="Invest?"),
        TaskList(user_id=2, title="School"),
        Task(task_list_id=1, title="Do Somthing Cool"),
        Task(task_list_id=1, title="Do Somthing Cool But Safe"),
        Task(task_list_id=1, title="Do Somthing Else Cool"),
        Task(task_list_id=1, title="Do Nothing"),
        Task(task_list_id=1, title="Hello, Do Something"),
        Task(task_list_id=1, title="I'm Gonna Do This"),
        Task(task_list_id=1, title="Don't Do This"),
        Task(task_list_id=1, title="Do This"),
        Task(task_list_id=2, title="bnb"),
        Task(task_list_id=2, title="bsv"),
        Task(task_list_id=2, title="usdt"),
        Task(task_list_id=2, title="ltc"),
        Task(task_list_id=2, title="eth"),
        Task(task_list_id=1, title="trx"),
        Task(task_list_id=2, title="xmr"),
        Task(task_list_id=2, title="ada"),
        Task(task_list_id=2, title="xtz"),
        Task(task_list_id=1, title="wbtc"),
        Task(task_list_id=3, title="xtz"),
        Task(task_list_id=3, title="trx"),
        Task(task_list_id=4, title="wbtc"),
        Task(task_list_id=4, title="ltc"),
        Task(task_list_id=4, title="dot"),
        Task(task_list_id=3, title="btc"),
        Task(task_list_id=3, title="ada"),
        Task(task_list_id=3, title="eth"),
        Task(task_list_id=3, title="fil"),
        Task(task_list_id=3, title="vet"),
        Task(task_list_id=3, title="dai"),
    ]

    for seed in seeder:
        db.session.add(seed)
    db.session.commit()
