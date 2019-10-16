import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends  React.Component{
    constructor(props)
    {
        super(props);

        let time = new Date();

        this.state =
            {
                Messages: [
                    {

                        sender: "Bot",
                        message:"Hi",
                        time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
                        id:0
                    }]
            };

        this.AddMessage = this.AddMessage.bind(this);

    }

    AddMessage(msg)
    {
      msg.id = this.state.Messages[this.state.Messages.length-1].id +1;
      const arr = this.state.Messages; arr.push(msg);

      this.setState({
          Messages: arr
      });


    }



    render(){
        return (
            <div>
                <Log messages={this.state.Messages}/>
                <hr />

                <NewMessageArea sendHandler={msg =>this.AddMessage(msg)}/>
            </div>);
    }
}



class NewMessageArea extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
          sendHandler:props.sendHandler
        };


    }

    AddMessageHandler = e =>
    {
      e.preventDefault();
      let time = new Date();
      let text=this.refs.mes.value;
      this.refs.mes.value="";
      let msg =
          {
            sender:"Me",
              message:text,
              time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
          };
      this.state.sendHandler(msg);
    }

    render(){
        return (
            <div>
              <form onSubmit={this.AddMessageHandler}>
                <input type="text" ref="mes"/>
                <button onClick={this.AddMessageHandler}> Send </button>
              </form>

            </div>
        );
    }
}

class Log extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            messages: props.messages
        };

    }
    render(){
        return(
            <div>
                {this.state.messages.map(msg=>
                    <li key={msg.id}>
                        <OldMessage sender={msg.sender} message={msg.message} time={msg.time} />
                    </li>
                )}
            </div>
        )
    }
}

class OldMessage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state= {
            sender: props.sender,
            message: props.message,
            time: props.time
        }
    }
    render()  {
        return (
            <div>
                <h1>{this.state.sender}</h1>
                <p>{this.state.message}</p>
                <p>{this.state.time}</p>

            </div>
        )
    }
}

export default App;
