using System;
using System.ComponentModel.DataAnnotations;

namespace KidSeek.Api.Models
{
    public class Subject
    {
        [Key]
        public int SubjectId { get; set; }          // Mã môn học

        [Required]
        public string Name { get; set; }            // Tên môn học

        public string Description { get; set; }     // Mô tả ngắn về môn học

        public string Image { get; set; }           // Hình ảnh đại diện

        public int Grade { get; set; }              // Lớp phù hợp

        public DateTime CreatedAt { get; set; } = DateTime.Now; // Ngày tạo
    }
}
