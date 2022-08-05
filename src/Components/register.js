import axios from "axios";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './login.css';

function Register(){

    let history = useNavigate();

    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    const idChange = (e) => {
        setIdValue(e.target.value);
        setExistIdCheckMsg(false);
        setIsAvailableId(false);
    }
    const pwChange = (e) => setPwValue(e.target.value);
    const nameChange = (e) => setNameValue(e.target.value);
    const emailChange = (e) => setEmailValue(e.target.value);

    const [existIdCheckMsg, setExistIdCheckMsg] = useState(false);
    const [isAvailableId, setIsAvailableId] = useState(false);

    const checkIdBtn = () => {
        if(idValue===""){
            alert("아이디를 입력해주세요");
        }
        else{
            sendCheckId(idValue);
        }
    }

    const sendCheckId = async (id) => {
        await axios.post('http://localhost:3000/getId', null, {params:{"id":id}})
        .then(function(resp){
            //console.log(resp.data);
            if(resp.data === "NO"){
                setIdValue("");
                setExistIdCheckMsg(true);
                setIsAvailableId(false);
            }
            else{
                setExistIdCheckMsg(false);
                setIsAvailableId(true);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const regiBtn = () => {
        if(isAvailableId===false){
            alert("아이디 중복확인을 해주세요!");
        }
        else if(pwValue===""){
            alert("비밀번호를 입력해주세요");
        }
        else if(nameValue===""){
            alert("이름을 입력해주세요");
        }
        else if(emailValue===""){
            alert("이메일을 입력해주세요");
        }
        else{
            sendData(idValue, pwValue, nameValue, emailValue);
        }
    }

    const sendData = async (id, pw, name, email) => {
        await axios.post('http://localhost:3000/account', null, {params:{"id":id, "pwd":pw, "name":name, "email":email}})
        .then(function(resp){
            console.log(resp.data);
            history('/login');
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const cancelBtn = () => {
        history('/login');
    }

    return (
        <div>
            <div className="loginBox">
                <h2>회원가입</h2>
                <form>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" className="form-control" placeholder="아이디" value={idValue} onChange={idChange}></input>
                                {existIdCheckMsg
                                ?<span className="alertMessage">이미 존재하는 아이디입니다.</span>
                                :<span></span>
                                }
                                {isAvailableId
                                ?<span className="alertMessage">사용 가능한 아이디입니다.</span>
                                :<span></span>
                                }
                                <button type="button" className="btn btn-primary float-right checkIdBtn" onClick={checkIdBtn}>아이디 중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="password" className="form-control" placeholder="비밀번호" onChange={pwChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type="text" className="form-control" placeholder="이름" onChange={nameChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input type="text" className="form-control" placeholder="이메일" onChange={emailChange}></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <button type="button" className="btn btn-primary" onClick={regiBtn}>회원가입</button>
                <button type="button" className="btn btn-light" onClick={cancelBtn}>취소</button>
            </div>
        </div>
    )
}

export default Register;