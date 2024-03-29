"""add tag/remind/due to Task model

Revision ID: 551fd13cd150
Revises: 7523624d4947
Create Date: 2022-06-06 14:09:00.675184

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '551fd13cd150'
down_revision = '7523624d4947'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('create_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.add_column('tasks', sa.Column('due_date', sa.DateTime(), nullable=True))
    op.add_column('tasks', sa.Column('remind_date', sa.DateTime(), nullable=True))
    op.add_column('tasks', sa.Column('tag', sa.String(length=50), nullable=True))
    op.add_column('tasks', sa.Column('update_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True))
    op.drop_column('tasks', 'created_on')
    op.drop_column('tasks', 'updated_on')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('updated_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.add_column('tasks', sa.Column('created_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.drop_column('tasks', 'update_date')
    op.drop_column('tasks', 'tag')
    op.drop_column('tasks', 'remind_date')
    op.drop_column('tasks', 'due_date')
    op.drop_column('tasks', 'create_date')
    # ### end Alembic commands ###
