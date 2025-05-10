using System.ComponentModel.DataAnnotations;

namespace KidSeek.Api.Models
{
    public class MonHoc
    {
        [Key]
        public int MaMonHoc { get; set; }

        [Required]
        [MaxLength(255)]
        public string TenMonHoc { get; set; }

        public string MoTa { get; set; }

        public string HinhAnh { get; set; }
    }
}
