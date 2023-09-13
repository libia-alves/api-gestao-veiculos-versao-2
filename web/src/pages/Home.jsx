import { Link } from 'react-router-dom';

export function Home () {
        return (

            <div className='text-center mt-5'>
                <h1>Bem vindo!</h1>
                <p>Por favor, selecione para onde deseja ir: </p>
                <Link to="/foods" className='btn btn-primary me-2'>
                    Alimentos
                </Link>
                <Link to="/customers" className='btn btn-primary'>
                    CLientes
                </Link>



            </div>

        );
}