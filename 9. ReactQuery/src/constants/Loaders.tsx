import { FadeLoader } from 'react-spinners';

function Loaders() {
    return <FadeLoader
        color='#d2db4e'
        cssOverride={{
            display: 'block',
            margin: '0 auto',
            borderColor: '#d2db4e',
        }}
    />
}

export default Loaders