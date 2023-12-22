
export const rateOfPlayers = (allPlayers: [] ) => {
    const allSuccessRates: Array<number | undefined> = [];
    let totalSum = 0;

    allPlayers.map((element) => {
      if (element.success_rate !== 0 || element.success_rate !== 'undefined')
        totalSum += Math.round(element.success_rate);
    });

    return Math.round(totalSum / allPlayers.length);
}
