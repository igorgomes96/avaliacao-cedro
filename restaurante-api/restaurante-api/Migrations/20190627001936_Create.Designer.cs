﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RestauranteApi.Models;

namespace RestauranteApi.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20190627001936_Create")]
    partial class Create
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RestauranteApi.Models.Prato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome");

                    b.Property<float>("Preco");

                    b.Property<int>("RestauranteId");

                    b.HasKey("Id");

                    b.HasIndex("RestauranteId");

                    b.ToTable("Pratos");
                });

            modelBuilder.Entity("RestauranteApi.Models.Restaurante", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.ToTable("Restaurantes");
                });

            modelBuilder.Entity("RestauranteApi.Models.Prato", b =>
                {
                    b.HasOne("RestauranteApi.Models.Restaurante", "Restaurante")
                        .WithMany()
                        .HasForeignKey("RestauranteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}