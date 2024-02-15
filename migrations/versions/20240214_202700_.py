"""empty message

Revision ID: f46086dc032d
Revises: 9c0d6e32dff1
Create Date: 2024-02-14 20:27:00.695408

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f46086dc032d'
down_revision = '9c0d6e32dff1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('followers', sa.Column('user_id', sa.Integer(), nullable=True))
    op.drop_constraint('followers_followed_user_id_fkey', 'followers', type_='foreignkey')
    op.create_foreign_key(None, 'followers', 'users', ['user_id'], ['id'])
    op.drop_column('followers', 'followed_user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('followers', sa.Column('followed_user_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'followers', type_='foreignkey')
    op.create_foreign_key('followers_followed_user_id_fkey', 'followers', 'users', ['followed_user_id'], ['id'])
    op.drop_column('followers', 'user_id')
    # ### end Alembic commands ###