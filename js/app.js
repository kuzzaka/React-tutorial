var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    count: 0,
    getInitialState: function() {
        return {
            counter: 0
        }
    },
    clickCounter: function () {
        this.setState({
            counter: ++this.state.counter
        })
    },
    render: function () {
        var data = this.props.data,
            newsTemplate,
            that = this;
        if (data.length) {
            newsTemplate = data.map(function (item) {
                that.count++;
                return (
                    <Article data={item} id={that.count}/>
                )
            });
        } else {
            newsTemplate = <p>No news</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                {data.length ? <strong onClick={this.clickCounter}>Всего новостей: {data.length}</strong> : ''}
                <p>{this.state.counter}</p>
            </div>
        );
    }
});

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function () {
        return {
            visible: false
        }
    },
    readMoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function () {
        var data = this.props.data,
            id = this.props.id,
            bigText = this.props.bigText,
            visible = this.state.visible;
        return (
            <div key={id} className="article">
                <p className="news__author">{data.author}:</p>
                <p className="news__text">{data.text}</p>
                <a onClick={this.readMoreClick} href="#" className={'news__readmore ' + (visible ? 'none' : '')}>Подробнее...</a>
                <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
            </div>
        )

    }
});

var Add = React.createClass({
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    getInitialState: function () {
        return {
            value: ''
        }
    },
    onClickHandler: function (e) {
        e.preventDefault();
        console.log(ReactDOM.findDOMNode(this.refs.author).value);
    },
    render: function () {
        return (
            <form className="add cf">
                <input
                    defaultValue=''
                    type="text"
                    className="add__author"
                    ref="author"
                    placeholder="Ваше имя"/>
                
                <textarea className="add__text" defaultValue='' cols="30" rows="10" placeholder="текст новости" ref="text">
                </textarea>
                
                <label htmlFor="agree" className="add__checkrule">
                    <input type="checkbox" name="agree" ref="checkrule" defaultChecked={false}/>
                    Я согласен с правилами
                </label>

                <button onClick={this.onClickHandler} className="add__btn" ref="alert_button">Отправить</button>
            </form>
        );
    }
});


var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);