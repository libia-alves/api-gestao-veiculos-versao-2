import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className='text-center mt-5'>
            <h1>Bem-vindo!</h1>
            <p>Por favor, selecione para onde deseja ir: </p>
            <Link to="/veiculos" className='btn btn-primary me-2'>
                Veículos
            </Link>
            <Link to="/escolas" className='btn btn-primary me-2'>
                Escolas
            </Link>
            <Link to="/horarios" className='btn btn-primary me-2'>
                Horários
            </Link>
            <Link to="/rotas" className='btn btn-primary me-2'>
                Rotas
            </Link>
            <Link to="/users" className='btn btn-primary'>
                Usuários
            </Link>
        </div>
    );
}
