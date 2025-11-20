// Добавляем эту функцию для определения местоположения
function setupLocationFinder() {
  const locateBtn = document.getElementById('locateMe');
  
  locateBtn.addEventListener('click', function() {
    if (!navigator.geolocation) {
      alert('Геолокация не поддерживается вашим браузером');
      return;
    }
    
    locateBtn.innerHTML = '<span class="btn-icon">⏳</span>Определяем...';
    locateBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Перемещаем маркер А на текущее местоположение
        markerA.setLatLng([lat, lng]);
        map.setView([lat, lng], 15);
        
        // Обновляем адрес
        setAddressFromMarker(markerA, 'fromAddress');
        
        locateBtn.innerHTML = '<span class="btn-icon">📍</span>Местоположение найдено';
        setTimeout(() => {
          locateBtn.innerHTML = '<span class="btn-icon">📍</span>Мое местоположение';
          locateBtn.disabled = false;
        }, 2000);
      },
      function(error) {
        alert('Не удалось определить ваше местоположение. Проверьте разрешения браузера.');
        locateBtn.innerHTML = '<span class="btn-icon">📍</span>Мое местоположение';
        locateBtn.disabled = false;
      }
    );
  });
}

// Обновляем функцию инициализации
function initApp() {
  applyLang();
  setupLocationFinder();
  calculatePrice();
  
  // Устанавливаем начальные адреса
  setTimeout(() => {
    setAddressFromMarker(markerA, 'fromAddress');
    setAddressFromMarker(markerB, 'toAddress');
  }, 1000);
}

// Запускаем приложение
initApp();
