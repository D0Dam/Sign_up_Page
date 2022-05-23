let countFail = 0;
function isValidEmail(email) {
	const emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	return email.match(emailRegExp);
}
function isValidPassword(password) {
	const passwordRegExp =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&\(\)\\])[A-Za-z\d$@$!%*#?&\(\)\\]{8,}$/;
	return password.match(passwordRegExp);
}

function loginButtonClick() {
	const id = document.querySelector(".id").value;
	const pw = document.querySelector(".pw").value;
	if (Cookies.get("flag") == "preventLogin") {
		return alert(
			"5회 이상 잘못 입력하여 1시간 동안 로그인을 시도할 수 없습니다."
		);
	}
	if (!id && !pw) {
		alert("id와 password가 입력되지 않았습니다.");
		countFail++;
	} else if (!id) {
		alert("id가 입력되지 않았습니다.");
		countFail++;
	} else if (!pw) {
		alert("password가 입력되지 않았습니다.");
		countFail++;
	} else {
		if (!isValidEmail(id)) {
			alert("올바르지 않은 id 형식입니다.");
			countFail++;
		} else if (!isValidPassword(pw)) {
			alert("올바르지 않은 password 형식입니다.");
			countFail++;
		} else {
			localStorage.setItem("ID", id);
			sessionStorage.setItem("ID", id);
			Cookies.set("ID", id, { expires: 3 });
			alert("ID가 저장됩니다!");
		}
	}
	console.log(countFail);
	if (countFail == 5) {
		Cookies.set("flag", "preventLogin", { expires: 0.0417 });
	}
}

function logoutButtonClick() {
	const cookieName = "ID";
	const cookieFlag = "flag";
	localStorage.clear();
	sessionStorage.clear();
	Object.keys(Cookies.get()).forEach(function () {
		Cookies.remove(cookieName);
		//Cookies.remove(cookieFlag);
	});
}

function idChange(email) {
	const v = email.value;
	const info = document.querySelectorAll(".signup__idInfo");
	if (!isValidEmail(v)) {
		info[0].style.color = "red";
	} else {
		info[0].style.color = "black";
	}
}

function pwChange(password) {
	const v = password.value;
	const info = document.querySelectorAll(".signup__pwInfo");
	if (!isValidPassword(v)) {
		info[0].style.color = "red";
	} else {
		info[0].style.color = "black";
	}
}

function pwCheck(check) {
	const password = document.querySelector(".pw").value;
	const info = document.querySelectorAll(".signup__pw-checkInfo");
	if (password != check.value) {
		info[0].innerText = "비밀번호가 맞지 않습니다.";
		info[0].style.color = "red";
	} else {
		info[0].innerText = "비밀번호를 다시 입력해주세요.";
		info[0].style.color = "black";
	}
}

function snToMajor(sn) {
	sn.value = sn.value.replace(/[^0-9]/, "");
	const str = sn.value;
	const majorN = str.substring(5, 7);
	const majorList = document.querySelector(".form-select");
	const len = majorList.options.length;
	for (let i = 0; i < len; i++) {
		if (majorList.options[i].value == majorN) {
			majorList.options[i].selected = true;
		}
	}
}

function pnAutoHyphen(pn) {
	pn.value = pn.value
		.replace(/[^0-9]/, "")
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

function signUpClick() {
	alert("회원가입!");
}

axios
	.get("https://api.thecatapi.com/v1/images/search?size=full")
	.then((response) => {
		const resData = response.data;
		const imgUrl = resData[0].url;
		document.getElementById("catImg").src = imgUrl;
	})
	.catch((error) => console.log(new Error(error)));
