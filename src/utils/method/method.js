// Hàm set cookie lên trình duyệt
export function setCookie(name, value, days = 7) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Hàm lấy cookie từ trình duyệt
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Hàm xóa cookie từ trình duyệt
export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// Hàm cắt chuỗi tối đa cho phù hợp với chiều dài mong muốn
export const truncateString = (str, maxLength = 10) => {
  if (str?.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded) {
    return true; // Nếu không decode được, coi như token đã hết hạn
  }
  const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
  // Kiểm tra nếu thời gian hiện tại lớn hơn exp thì token đã hết hạn
  if (decoded.exp && currentTime > decoded.exp) {
    return true; // Token đã hết hạn
  }

  return false; // Token còn hiệu lực
}

// Hàm kiểm tra login
export const checkLogin = () => {
  const token = getCookie("accessToken");

  if (token === null) {
    return null;
  } else {
    const decodedToken = decodeJWT(token);
    if (decodedToken === null) {
      deleteCookie("accessToken");
      return null;
    } else {
      const isExpires = isTokenExpired(token);
      if (isExpires === false) {
        return true;
      } else {
        deleteCookie("accessToken");
        return false;
      }
    }
  }
};

// Hàm format date theo dạng dd-mm-yyyy HH:MM:SS
export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
