## todoView 
I'm glad you stopped by! 🙂

I made [todoView](https://todoview.herokuapp.com/) because I've always been fascinated with todo applications—see my [here](https://johnpatrickanders.medium.com/new-year-new-list-choosing-a-to-do-app-that-fits-your-life-765620c99bab) for my favorite todo apps. I also needed an excuse to incorporate AWS into a personal project, which I've done here in order to associate a file with a task. I hope you enjoy checking it out, and please let me know how it can be better! 

I've only just finished MVP. In the near future, I'd love to:
1. Add the ability to archive lists and tasks,
2. Enhance filtering,
3. Implement shared lists and permissioning, and
4. Optimize for mobile experience.



## Installation
1. Clone the repository

   ```bash
   $ git clone https://github.com/johnpatrickanders/todo.git
   ```
2. Install dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   $ pipenv install alembic Flask-Migrate
   ```

3. Open psql and create user and database

   - Create user "todojpa" with password "<<super_strong_secret_password>>"
   - Create database todojpa_dev_db with owner todojpa


4. Create .flaskenv with:
    ```bash
   FLASK_APP=starter_app
   ```

5. create a .env and add configuration modeled below:

   ```
   DATABASE_URL=postgresql://username:password@localhost/todojpa_dev_db
   SECRET_KEY=<<super_secret_key>>
   ```


6. migrate to database

   ``` pipenv shell
    $ flask db init
    $ flask db migrate
    $ flask db upgrade
   ```

5. Activate python shell and seed database

   ```bash
   $ pipenv shell
   ```

   ```
   $ python -m database && flask run
   ```

***
