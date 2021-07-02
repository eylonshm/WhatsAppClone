//This function generates pic src for material's UI Avatar
const picSrcGenerator = () => {
    // console.log('new Image avater')
    return `http://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 5000)}.svg`
}
export default picSrcGenerator
