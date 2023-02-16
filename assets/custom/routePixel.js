export default function () {
    onNuxtReady(() => {
    let dw = window.innerWidth;
    let dh = window.innerHeight;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = dw * devicePixelRatio;
    canvas.height = dh * devicePixelRatio;
    
    window.addEventListener("resize", () => {
        canvas.width = dw * devicePixelRatio;
        canvas.height = dh * devicePixelRatio;
    })
    
    const row = 25;
    const col = 5;
    
    const colors = ["rgba(43, 15, 255, 1)", "rgba(233, 187, 255, 1)", "rgba(220, 247, 162, 1)"];
    
    function runAnimation(n) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let timeout = row * col;
        let randomColor = Math.round(Math.random() * (colors.length - 1));
    
        for (let i =0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let newsTime = setTimeout(() => {
                    ctx.save()
                        const w = canvas.width / col;
                        const h = canvas.height / row;
                        ctx.translate(w * j, h * i);
        
                        let gradient = ctx.createLinearGradient(0, 0, w, h);
                        gradient.addColorStop(0, "rgba(250, 250, 250, 1)");
                        gradient.addColorStop(1, colors[randomColor]);
        
                        const deg = Math.ceil(Math.random() * 4);
                        ctx.rotate((deg === 4 ? 0 : deg === 3 ? 270 : deg === 2 ? 180 : 90) * Math.PI/ 180);
        
        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, w, h);
                    ctx.restore()
                    timeout--;
                    if (n === 1) {
                        if (timeout < row*col/2) {
                            ctx.clearRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * canvas.width/4, Math.random() * canvas.height/4)
                        }
                        if (timeout < row*col/7) { ctx.clearRect(0, 0, canvas.width, canvas.height); clearTimeout(newsTime); }
                    }
                }, 1000 * (j/(Math.random()*20)) * (i/(Math.random()*20)));
            }
        }
    }
    
   runAnimation(1)});
}