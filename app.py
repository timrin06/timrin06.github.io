from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
db = SQLAlchemy(app)


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    header = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(300), nullable=False)
    hit = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return '<Card %r>' % self.id


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(25), nullable=False)
    password = db.Column(db.String(25), nullable=False)
    bag = db.Column(db.String(100))

    def __repr__(self):
        return '<User %r>' % self.id


@app.route('/')
@app.route('/home')
@app.route('/main')
def main():
    cards = Card.query.order_by(Card.hit.desc()).order_by(Card.id).all()
    return render_template("index.html", cards=cards)


@app.route('/main/user<int:id><string:email><string:password>')
def mainUser(id, email, password):
    cards = Card.query.order_by(Card.hit.desc()).order_by(Card.id).all()
    user = User.query.get(id)
    return render_template("index.html", cards=cards, user=user)


@app.route('/registrate', methods=['POST', 'GET'])
def registrate():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User(email=email, password=password)

        # noinspection PyBroadException
        try:
            db.session.add(user)
            db.session.commit()
            return redirect('/main')
        except:
            return 'Error'


@app.route('/delUser')
def delUser():
    users = User.query.order_by(User.id).all()
    for us in users:
        db.session.delete(us)
        db.session.commit()
        return 'ok'


@app.route('/reg')
def reg():
    users = User.query.order_by(User.id).all()
    return render_template('reg.html', users=users)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        users = User.query.order_by(User.id).all()
        email = request.form['email']
        password = request.form['password']

        for user in users:
            if email == user.email:
                if password == user.password:
                    return redirect('/main/user%s' % user.id + user.email + user.password)
                else:
                    return '000ps'
    else:
        return redirect('/main')
# @app.route()
# @app.route('/newUser', methods=['POST', 'GET'])
# def newUser():
#     pass


@app.route('/newCard', methods=['POST', 'GET'])
def newCard():
    if request.method == 'POST':
        header = request.form['header']
        price = request.form['price']
        text = request.form['text']
        img = request.form['img']
        checkbox = request.form.get('checkbox')

        if checkbox:
            hit = True
        else:
            hit = False

        card = Card(header=header, price=price, text=text, img=img, hit=hit)

        try:
            db.session.add(card)
            db.session.commit()
            return redirect('/')
        except:
            return 'error'
    else:
        return render_template("newCard.html")


@app.route('/delCard/<int:id>')
def delCard(id):
    try:
        card = Card.query.get(id)
        db.session.delete(card)
        db.session.commit()
        return "OK"
    except:
        return "ERROR"


@app.route('/delCard/All')
def delCardAll():
    cards = Card.query.order_by(Card.hit.desc()).order_by(Card.id).all()
    n = True
    for el in cards:
        return redirect('/delCard/' + str(el.id))


@app.route('/redCard/<int:id>', methods=['POST', 'GET'])
def redCard(id):
    card = Card.query.get(id)
    if request.method == 'POST':
        card.header = request.form['header']
        card.price = request.form['price']
        card.text = request.form['text']
        card.img = request.form['img']
        checkbox = request.form.get('checkbox')
        if checkbox:
            card.hit = True
        else:
            card.hit = False

        try:
            db.session.commit()
            return redirect('/')
        except:
            return "ERROR"
    else:
        return render_template("redCard.html", card=card)


if __name__ == "__main__":
    app.run(debug=True)
