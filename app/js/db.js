function salvar(){
    alert(document.getElementById("inputFile1").file.)
    localStorage.setItem('address', document.getElementById("inputAddress").value)
    localStorage.setItem('user', document.getElementById("inputUser").value)
    localStorage.setItem('password', document.getElementById("inputPassword").value)
    localStorage.setItem('file1', document.getElementById("inputFile1").value)
    localStorage.setItem('file2', document.getElementById("inputFile2").value)
    localStorage.setItem('file3', document.getElementById("inputFile3").value)
    

    window.location.replace('../html/index.html')
    //getConnection();
}

