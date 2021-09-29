package path

import "os"

func IsExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil || os.IsExist(err)
}

func IsNotExist(path string) bool {
	return !IsExist(path)
}
