async function getData() {  
    const response = await fetch("League_of_Legends_Champion_Stats_13.1.csv");
    const data = (await response.text()).slice(1);
    const rows = data.split("\n");
    const splitData = []
    rows.forEach((elem) => {
        const row = elem.split(";");
        const champClass = row[1];
        const champWR = row[6];
        splitData.push(champClass);
        splitData.push(champWR);
    });
    return splitData
}

async function chart() {
    const splitData = await getData()
    let TankWR = 0
    let TankCount = 0
    let FighterWR = 0
    let FighterCount = 0
    let MageWR = 0
    let MageCount = 0
    let AssassinWR = 0
    let AssassinCount = 0
    let MarksmanWR = 0
    let MarksmanCount = 0

    for(let i = 0; i < splitData.length; i+=2) {
      if(splitData[i] == "Tank") {
        TankCount++;
        TankWR += parseFloat(splitData[i+1].slice(0, -1))
      }
      if(splitData[i] == "Fighter") {
        FighterCount++;
        FighterWR += parseFloat(splitData[i+1].slice(0, -1))
      }
      if(splitData[i] == "Mage") {
        MageCount++;
        MageWR += parseFloat(splitData[i+1].slice(0, -1))
      }
      if(splitData[i] == "Assassin") {
        AssassinCount++;
        AssassinWR += parseFloat(splitData[i+1].slice(0, -1))
        console.log(AssassinCount)
        console.log(AssassinWR)
      }
      if(splitData[i] == "Marksman") {
        MarksmanCount++;
        MarksmanWR += parseFloat(splitData[i+1].slice(0, -1))
      }
    }
    let AvgTankWR = TankWR / TankCount
    let AvgFighterWR = FighterWR / FighterCount
    let AvgMageWR = MageWR / MageCount
    let AvgAssassinWR = AssassinWR / AssassinCount
    let AvgMarksmanWR = MarksmanWR / MarksmanCount

    const WRList = [AvgTankWR, AvgFighterWR, AvgMageWR, AvgAssassinWR, AvgMarksmanWR]
    console.log(WRList)
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Tank", "Fighter", "Mage", "Assassin", "Marksman"],
        datasets: [{
          label: 'Average League of Legends Winrate by Class',
          data: WRList,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            min: 45,
            max: 52,
            ticks: {
              callback: function(value, index, ticks) {
                return value + '%';
              }
            }
          }
        }
      }
    });
}
//end of functions
//call the function to test if you see the image on the left in the console
getData()
chart()