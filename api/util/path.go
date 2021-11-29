package util

import "os"

func PathIsExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil || os.IsExist(err)
}

func PathIsNotExist(path string) bool {
	return !PathIsExist(path)
}
