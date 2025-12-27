package main

import (
	"backend/api/patients"
	patientsid "backend/api/patients/id"
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/api/patients", patients.Getpatients)
	http.HandleFunc("/api/patients/", patientsid.GetPatientById)
	fmt.Println("Server is running on: 8080")
	http.ListenAndServe(":8080", nil)
}
