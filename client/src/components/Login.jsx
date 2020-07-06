import React, { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleChange = (event) => {
        if (event.target.name === 'name')
            setName(event.target.value);
        if (event.target.name === 'room')
            setRoom(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Hola ${name} estas entrando a la sala ${room}`);
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
                    <input type="text" name="room" placeholder="Sala" onChange={handleChange} />
                </div>
                <input type="submit" value="Entrar" />
            </form>
        </div>
    );
}

export default Login;