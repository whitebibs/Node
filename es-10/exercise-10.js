function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

  async function getResults(){
    try{
        const data= await Promise.all([
            luckyDraw('Joe'),
            luckyDraw('Sabrina'),
            luckyDraw('Caroline'),
        ])
        console.log(data)
    }catch(er) {
        console.log(er.message);
    }
  }
  getResults()