
const Image = () => {
    const imageUrl = 'https://picsum.photos/200/300'
    const altText = 'Placeholder Image'
    return (
        <img
            src={imageUrl}
            alt={altText}
        />
    )
}

export default Image