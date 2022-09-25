using Microsoft.EntityFrameworkCore.Migrations;

namespace CakeShop.Migrations
{
    public partial class Mig2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cantitate",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Cantitate",
                table: "Transactions");
        }
    }
}
