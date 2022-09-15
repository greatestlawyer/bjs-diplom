const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if(response.success){
      window.location.reload();
    }
  });
}

//Получение информации о пользователе
ApiConnector.current(response => {
  if(response.success){
      ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
let ratesBoard = new RatesBoard();
const getExchangeRate = ApiConnector.getStocks(response => {
  if(response.success){
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
});
getExchangeRate();
setInterval(getExchangeRate, 60000);

//Операции с деньгами
let moneyManager = new MoneyManager();
const moneyCallBack = (response) => {
  if(response.success){
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true,'Успешно!');
    } else {
        moneyManager.setMessage(false, response.error);
    }
};

moneyManager.addMoneyCallback = (data) => {
ApiConnector.addMoney(data, moneyCallBack);
  }

moneyManager.conversionMoneyCallback = (data) => {
ApiConnector.convertMoney(data, moneyCallBack);
  }

moneyManager.sendMoneyCallback = (data) => {
ApiConnector.transferMoney(data, moneyCallBack);
  }

//Работа с избранным

//Запрос начального списка избранного
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if(response.success){
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    favoritesWidget.updateUsersList(data);
  }
});
//Добавление пользователя в список избранных
const userCallBack = (response) => {
  if(response.success){
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    favoritesWidget.updateUsersList(data);
  } else {
        favoritesWidget.setMessage(false, response.error);
    }
}
favoritesWidget.addUserCallback = (data) => {
ApiConnector.addUserToFavorites(data, userCallBack);
  }
//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
ApiConnector.removeUserFromFavorites(data, userCallBack);
  }