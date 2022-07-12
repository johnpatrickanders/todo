"""add img url to Task

Revision ID: ea274d2b14de
Revises: 551fd13cd150
Create Date: 2022-07-02 17:31:16.791598

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ea274d2b14de'
down_revision = '551fd13cd150'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('file_url', sa.String(length=1000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tasks', 'file_url')
    # ### end Alembic commands ###