package k8s

import (
	entity "github.com/czyhome/circler/entity"
	"github.com/gin-gonic/gin"
)

type VolumeInputModel struct {
	entity.BaseModel
	Capacity   int64  `json:"capacity"`
	AccessMode string `json:"accessMode"`
	Yaml       string `json:"yaml"`
}

type VolumeSearchModel struct {
	entity.BaseQuery
}

func VolumeList(c *gin.Context) {
	//search := VolumeSearchModel{}
	//err := c.Bind(&search)
	//if err != nil {
	//	panic(err)
	//}
	//client:= config.K8sClientMap["dev"]
	//pvs, _ := client.CoreV1().PersistentVolumeClaims(config.Namespace).List(context.TODO(), metav1.ListOptions{})
	//items := make([]v1.PersistentVolumeClaim, 0)
	//itemQuery := linq.From(pvs.Items)
	//if search.Name != "" {
	//	itemQuery = itemQuery.
	//		WhereT(func(t v1.PersistentVolumeClaim) bool {
	//			return strings.Contains(t.Name, search.Name)
	//		})
	//}
	//itemQuery.ToSlice(&items)
	//data := make(map[string]interface{})
	//data["items"] = items
	//data["metadata"] = pvs.ListMeta
	//entity.Response{Context: c}.
	//	Data(data).
	//	Build()
}

func VolumeDetail(c *gin.Context) {
	//input := VolumeInputModel{}
	//err := c.Bind(&input)
	//if err != nil {
	//	panic(err)
	//}
	//client:= config.K8sClientMap["dev"]
	//pv, _ := client.CoreV1().PersistentVolumeClaims(config.Namespace).Get(context.TODO(), input.Name, metav1.GetOptions{})
	//entity.Response{Context: c}.
	//	Data(pv).
	//	Build()
}

func VolumeCreate(c *gin.Context) {
	//input := VolumeInputModel{}
	//err := c.Bind(&input)
	//if err != nil {
	//	panic(err)
	//}
	//storage := "managed-nfs-storage"
	//pv := &v1.PersistentVolumeClaim{
	//	ObjectMeta: metav1.ObjectMeta{
	//		Name: input.Name,
	//	},
	//	Spec: v1.PersistentVolumeClaimSpec{
	//		AccessModes: []v1.PersistentVolumeAccessMode{v1.PersistentVolumeAccessMode(input.AccessMode)},
	//		Resources: v1.ResourceRequirements{
	//			Requests: map[v1.ResourceName]resource.Quantity{
	//				"storage": resource.MustParse(strconv.FormatInt(input.Capacity, 10) + "Gi"),
	//			},
	//		},
	//		StorageClassName: &storage,
	//	},
	//}
	//client:= config.K8sClientMap["dev"]
	//pvCreateResult, err := client.CoreV1().PersistentVolumeClaims(config.Namespace).Create(context.TODO(), pv, metav1.CreateOptions{})
	//if err != nil {
	//	panic(err)
	//}
	//entity.Response{Context: c}.
	//	Data(pvCreateResult).
	//	Build()
}

func VolumeEditYaml(c *gin.Context) {
	//input := VolumeInputModel{}
	//err := c.Bind(&input)
	//if err != nil {
	//	panic(err)
	//}
	//var pv v1.PersistentVolumeClaim
	//err = yaml.Unmarshal([]byte(input.Yaml), &pv)
	//if err != nil {
	//	panic(err)
	//}
	//client:= config.K8sClientMap["dev"]
	//pvPatchResult, err := client.CoreV1().PersistentVolumeClaims(config.Namespace).Update(context.TODO(), &pv, metav1.UpdateOptions{})
	//if err != nil {
	//	panic(err)
	//}
	//entity.Response{Context: c}.
	//	Data(pvPatchResult).
	//	Build()
}
